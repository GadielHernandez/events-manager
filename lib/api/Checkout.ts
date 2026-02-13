import Cart from '../storage/Cart'

class Calendar {
    async createPrecontact(data: Record<string, any>) {
        const bundles = Cart.getItems()

        try {
            const res = await fetch(`/api/checkout`, {
                method: 'POST',
                body: JSON.stringify({ ...data, bundles }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            })
            if (!res.ok) throw new Error('Error al agendar el evento')

            return
        } catch (error) {
            console.error('❌ Error:', error)
            return { error: 'Error creating the event' }
        }
    }
}

export default new Calendar()
