export type CartItem = {
    id: string
    name: string
    price: number
    category: string
    categoryId: string
    extras?: string[]
}

const STORAGE_KEY = 'cart'

class Cart {
    private items: Map<string, CartItem> = new Map()
    private changeCallbacks: Array<(items: Map<string, CartItem>) => void> = []

    constructor() {
        this.loadFromStorage()
    }

    private saveToStorage() {
        const itemsArray = Array.from(this.items.values())
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsArray))
    }

    private loadFromStorage() {
        const data = window.localStorage.getItem(STORAGE_KEY)
        if (data) {
            try {
                const items: CartItem[] = JSON.parse(data)
                this.items = new Map(items.map((item) => [item.id, item]))
            } catch (e) {
                console.error(
                    '❌ Error cargando carrito desde window.localStorage:',
                    e
                )
                this.items.clear()
            }
        }
    }

    private notifyChange() {
        for (const callback of this.changeCallbacks) {
            callback(this.items)
        }
    }

    private updateAndSave() {
        this.saveToStorage()
        this.notifyChange()
    }

    addChangeCallback(callback: (items: Map<string, CartItem>) => void) {
        this.changeCallbacks.push(callback)
    }

    addItem(item: CartItem) {
        const existing = this.items.get(item.id)
        if (existing) return

        this.items.set(item.id, item)
        this.updateAndSave()
    }

    removeItem(id: string) {
        this.items.delete(id)
        this.updateAndSave()
    }

    clear() {
        this.items.clear()
        window.localStorage.removeItem(STORAGE_KEY)
        this.notifyChange()
    }

    getItem(id: string): CartItem | undefined {
        return this.items.get(id)
    }

    getItems(): CartItem[] {
        return Array.from(this.items.values())
    }

    getItemsCategory(categoryId: string): CartItem[] {
        return Array.from(this.items.values()).filter(
            (item) => item.categoryId === categoryId
        )
    }

    getTotal(): number {
        return this.getItems().reduce((sum, item) => sum + item.price, 0)
    }

    toJSON() {
        return this.getItems()
    }
}

export default new Cart()
