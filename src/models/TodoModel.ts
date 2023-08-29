import { ReactNode } from "react"

export class TodoModel {
    id: string
    content: string
    hasCompleted: boolean
    children?: ReactNode
    
    constructor(id: string, content: string) {
        this.id = id
        this.content = content
        this.hasCompleted = false
    }
}