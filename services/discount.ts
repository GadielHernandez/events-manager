export function checkDiscount(code: string) {
    const CODE_DISCOUNT = process.env.CODE_DISCOUNT
    if (!code.startsWith(`${CODE_DISCOUNT}-`)) return 0

    const discountText = code.replace(`${CODE_DISCOUNT}-`, '')
    const discount = Number(discountText) || 0
    return discount
}
