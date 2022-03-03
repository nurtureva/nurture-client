import Provider from "../Provider/Provider"
import './ProviderTable.css'

export default function ProviderTable(props) {
    const renderProviders = () => {
        return props.providers.map((provider, i) => {
            return (
                <Provider provider={provider} key={i} />
            )
        })
    }
    return (
        renderProviders()
    )
}