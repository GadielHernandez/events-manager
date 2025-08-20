import Cart from '../storage/Cart'

class Calendar {
    async createPrecontact(data: Record<string, string>) {
        const cart = new Cart()
        const bundles = cart.getItems()

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
            return
        }
    }
}

export default new Calendar()
