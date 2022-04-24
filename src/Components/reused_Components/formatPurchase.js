const formatPurchase = (productId, customerId) => {
    console.log("formatPurchase")
    let purchaseObj = ({ productId: productId, customerId: customerId });
    //get the current israeli date
    let currentDate = new Date()
    function formatDate(date, format) {
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yy: date.getFullYear().toString().slice(-2),
            yyyy: date.getFullYear()
        }
        return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
    }
    currentDate = formatDate(currentDate, 'dd/mm/yy')
    // add date to final purchase object
    let purchaseInfo = { ...purchaseObj, date: currentDate }
    return purchaseInfo
}
export default formatPurchase
