

import Image from 'next/image'

const Logo = () => {
    return (
        <Image
            src="/logo.svg"
            height={30}
            width={30}
            alt="logo"
        />
    )
}

export default Logo