class Calendar {
    async createEvent(body: Record<string, string>) {
        try {
            const res = await fetch(`/api/google/events`, {
                method: 'POST',
                body: JSON.stringify(body),
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
