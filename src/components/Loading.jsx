export default function Loading({ absolute, condition, height, width, text, textSize }) {
    let style = "";

    if (absolute === true) {
        style = "absolute inset-0 justify-center flex items-center";
    } else {
        style = "justify-center flex items-center";
    }

    return (
        <>
            {
                condition && (
                    <div className={`${style} z-200 bg-gray-100`}>
                        <div className="flex flex-col items-center gap-4">
                            <div className={`${height} ${width} border-4 border-gray-900 border-t-transparent rounded-full animate-spin`}></div>
                            <p className={`font-bold ${textSize} tracking-wider`}>
                                {text}
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    )
}