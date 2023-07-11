import { access } from "fs/promises"

export const exists = async (path: string) => {
    try {
        await access(path)
        return true
    }catch(e) {
        return false
    }
}