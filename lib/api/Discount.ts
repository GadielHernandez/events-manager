class Discount {
    async checkDiscount(code: string) {
        try {
            const res = await fetch(`/api/discount`, {
                method: 'POST',
                body: JSON.stringify({ code }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            })
            if (!res.ok) throw new Error('Error al revisar el codigo')

            const data = await res.json()
            return data.discount
        } catch (error) {
            console.error('❌ Error:', error)
            return
        }
    }
}

export default new Discount()
