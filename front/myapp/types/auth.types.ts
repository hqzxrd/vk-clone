import { NextPage } from 'next'

import IChildren from '@/utils/children.inteface'

export type TypeRole = {
	isOnlyUser?: boolean
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRole

export type TypeComponentAuth = { Component: TypeRole } & IChildren
