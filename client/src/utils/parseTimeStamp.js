const parseTimeStamp = (timestamp) => {
    const timestampInMillis = Number(timestamp) * 1000;
    const date = new Date(timestampInMillis);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    // Format the date using Intl.DateTimeFormat
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default parseTimeStamp