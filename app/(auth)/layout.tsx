

const AuthLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div className="h-full grid place-items-center my-24">
            {children}
        </div>
    )
}

export default AuthLayout