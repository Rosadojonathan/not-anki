import React from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'flashcards: notifications'

export const getCardsLength = (vocab) => {
	if(vocab.length === 0) {
		return <Text>0 cards</Text>
	}else if (vocab.length > 1) {
		return <Text>{vocab.length} cards</Text>
	}else {
		return <Text>1 card</Text>
	}
}

function createNotification () {
	return {
		title: 'Study study study',
		body: '👋 do not forget to study today!',
		ios: {
			sound: true
		}
	}
}

export function setLocalNotification () {
	AsyncStorage.getItem(NOTIFICATION_KEY)
	.then(JSON.parse)
	.then((data) => {
		if(data === null) {
			Permissions.askAsync(Permissions.NOTIFICATIONS)
			.then(({ status }) => {
				if(status === 'granted'){
					Notifications.cancelAllScheduledNotificationsAsync()

					let tomorrow = new Date()
					tomorrow.setDate(tomorrow.getDate() + 1)
					tomorrow.setHours(20)
					tomorrow.setMinutes(0)

					Notifications.scheduleLocalNotificationAsync(
						createNotification(),
						{
							time: tomorrow,
							repeat: 'day'
						}
					)
					AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

				}
			})
		}
	})
}

export function clearLocalNotification () {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
	.then(Notifications.cancelAllScheduledNotificationsAsync)
}
