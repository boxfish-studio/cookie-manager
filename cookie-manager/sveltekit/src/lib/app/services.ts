import { initializeServices, stopCoreServices } from '$core/services'
import { get } from 'svelte/store'
import { configuredServices, servicesInitialized, removeAdditionalCookies } from './store'

export const initServices = (): void => {
	initializeServices(get(servicesInitialized), get(configuredServices), servicesInitialized.set)
}

export const stopServices = (): void => {
	stopCoreServices(get(configuredServices), removeAdditionalCookies, servicesInitialized.set)
}
