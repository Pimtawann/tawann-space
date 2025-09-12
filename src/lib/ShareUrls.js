const qs = (obj) => new URLSearchParams(obj).toString();

function buildShareUrls (options = {}){
    const {
        url = (typeof window !== "undefined" ? window.location.href : ""),
        title = (typeof document !== "undefined" ? document.title : ""),
        via = "",
        hashtags = [],
    } = options;

    const twiterParams = { url, text: title };
    if (via) twiterParams.via = via;
    if (hashtags.length) twiterParams.hashtags = hashtags.join(",");

    return {
        facebook: `https://www.facebook.com/share.php?${qs({ u: url })}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?${qs({ url })}`,
        twitter: `https://www.twitter.com/share?${qs(twiterParams)}`,
    }
}

export default buildShareUrls;