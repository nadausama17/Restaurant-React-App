export default function Footer() {
    return <div className="w-full px-2 bg-bistro-terracotta flex justify-between items-center">
        <div className="flex flex-col">
            <a target="_blank" href="https://www.flaticon.com/free-icons/restaurant" title="restaurant icons">Restaurant icons created by Freepik - Flaticon</a>
            <a href="https://www.flaticon.com/free-icons/empty" title="empty icons">Empty icons created by welovegraphics - Flaticon</a>
        </div>
        <span>&copy; {new Date().getFullYear()} Restaurant. All rights reserved.</span>
    </div>
}