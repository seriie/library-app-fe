export default function Foot({ memberOrNo, href, action }) {
    return (
        <p className="text-sm text-center text-gray-600 mt-6">
            {memberOrNo}{" "}
            <a
                href={href}
                className="underline text-gray-800 hover:text-gray-700"
            >
                {action}
            </a>
        </p>
    )
}