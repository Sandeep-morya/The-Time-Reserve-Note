function parseProxyResult(proxyResult) {
    const list = [];
    for (let x of proxyResult) {
        const newObject = {};
        newObject.id = x.id;
        newObject.title = x.data.title;
        newObject.subtitle = x.data.subtitle;
        newObject.description = x.data.description;
        newObject.imageHash = x.data.imageHash;
        newObject.mintPrice = x.data.mintPrice;
        newObject.maxPerWallet = x.supply.maxPerWallet;
        newObject.totalLimit = x.supply.totalLimit;
        newObject.totalSupply = x.supply.totalSupply;
        newObject.isLimited = x.supply.isLimited;
        newObject.createdAt = x.createdAt;
        newObject.mintingEnabled = x.access.mintingEnabled;
        newObject.enabledAt = x.access.enabledAt;
        list.push(newObject);
    }
    return list;
}

export default parseProxyResult;