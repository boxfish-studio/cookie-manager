import { initializeServices as initServices, stopServices as removeServices } from '$core/services'
import { get } from 'svelte/store'
import { configuredServices, servicesInitialized, removeAdditionalCookies } from './store'

export const initializeServices = (): void => {
	initServices(get(servicesInitialized), get(configuredServices), servicesInitialized.set)
}

export const stopServices = (): void => {
	removeServices(get(configuredServices), removeAdditionalCookies, servicesInitialized.set)
}
