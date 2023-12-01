
export default function Card({card, selectStat, handleSelect})
{

    if(!card) return <div className="card back"/>

    return(
        <div className="card">
            <img src={card.image}/>
            <ul className="stat-list">
                {card.stats.map((stat, index) => (
                    <li className={`stat-list-item${selectStat === index ? ' selected' : ''}`}
                    onClick={()=> handleSelect && handleSelect(index)}
                    key={index}>
                        <span>{stat.name}</span>
                        <span>{stat.value}</span> 
                    </li>
                ))}
            </ul>
        </div>
    );
}