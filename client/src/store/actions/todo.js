import { createAction } from '@reduxjs/toolkit'

export const create = createAction('sagaTodo/create')
export const updateStatus = createAction('sagaTodo/updateStatus')
export const updateName = createAction('sagaTodo/updateName')
export const deleteOne = createAction('sagaTodo/deleteOne')
export const deleteDone = createAction('sagaTodo/deleteDone')
export const getItems = createAction('sagaTodo/getItems')
