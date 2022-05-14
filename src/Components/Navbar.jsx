const Navbar = ({ login }) => {
    return (
        <div className="w-full bg-blue-500 flex flex-row justify-between px-4" style={{ height: '10vh' }}>
            <div className="my-auto">
                <h2 className="font-bold text-2xl text-white">Whatsapp Gateway</h2>
            </div>
            <div className="my-auto">
                { login ? (
                    <>
                        <p>logined</p>
                    </>
                ) : (
                    <button className="bg-white py-2 px-4 rounded font-bold">Login</button>
                )}
            </div>
        </div>
    );
}

export default Navbar