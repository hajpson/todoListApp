import { ReactNode } from "react"

export type Todo = {
    id: string
    content: string
    hasCompleted: boolean
    children?: ReactNode
}