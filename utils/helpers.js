import React from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'flashcards: notifications'

const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
const getDaysSinceEpoch = () => (
    Math.round(new Date().getTime() / DAY_IN_MINISECONDS)
);
export const TODAY = getDaysSinceEpoch();


export const getCardsLength = (vocab) => {
	if(vocab.length === 0) {
		return <Text>0 cards</Text>
	}else if (vocab.length > 1) {
		return <Text>{vocab.length} cards</Text>
	}else {
		return <Text>1 card</Text>
	} 
}

export const getCardsToReview = (vocab) => {
	let toReview = 0;
	vocab.forEach(word => {
		if (word.dueDate <= TODAY){
			toReview += 1;
		}
	})
	if(toReview === 0) {
		return <Text>0 cards</Text>
	}else if (toReview > 1) {
		return <Text>{toReview} cards</Text>
	}else {
		return <Text>1 card</Text>
	} 
}

export const displayLearningSessionButton = (vocab) => {
	let toReview = 0;
	vocab.forEach(word => {
		if (word.dueDate <= TODAY){
			toReview += 1;
		}
	})
	if(toReview === 0) {
		return false
	}else if (toReview >= 1) {
		return true
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
