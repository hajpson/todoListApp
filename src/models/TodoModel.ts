export class TodoModel {
    id: string
    content: string
    hasCompleted: boolean
    
    constructor(id: string, content: string) {
        this.id = id
        this.content = content
        this.hasCompleted = false
    }
}