const parseProxyImage = (x) => {
    const data = {};
    data.id = x[0]
    data.title = x[1].title;
    data.subtitle = x[1].subtitle;
    data.description = x[1].description;
    data.imageHash = x[1].imageHash;
    data.mintPrice = x[1].mintPrice;
    data.maxPerWallet = x[2].maxPerWallet;
    data.totalLimit = x[2].totalLimit;
    data.totalSupply = x[2].totalSupply;
    data.isLimited = x[2].isLimited;
    data.createdAt = x[3];
    data.mintingEnabled = x[4].mintingEnabled;
    data.enabledAt = x[4].enabledAt;
    return data;
}

export default parseProxyImage