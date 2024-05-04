const ChatMiniIcon = ({profileProp, isOwner}) =>{

    console.log(isOwner)
// "chatMiniProfileIconOwner"
    return(
        <div className={isOwner ? "chatMiniProfileIconOwner" : "chatMiniProfileIcon"}>
            {["skin", "hair", "eyes", "mouth", "clothes"].map((category) => (
                <img
                    key={category}
                    className="avatar-image"
                    data-category={category}
                    src={profileProp[`${category}Link`] || 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'}
                    alt={profileProp[category]}
                />
            ))}
        </div>
    )

}

export default ChatMiniIcon;