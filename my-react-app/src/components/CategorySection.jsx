import FuturisticCard from "./FuturisticCard";

function CategorySection({ title, data = [] }) {

  return (
    <div>

      <h2 className="category-title">{title}</h2>

      <div className="card-grid">

        {data.length === 0 ? (
          <p style={{ color: "gray" }}>No workshops available</p>
        ) : (
          data.map((item, index) => (
            <FuturisticCard
              key={index}
              title={item.title}
              image={item.image}
              price={item.price}
              oldPrice={item.oldPrice}
              tag={item.tag}
              status={item.status}
              pdf={item.pdf}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default CategorySection;
