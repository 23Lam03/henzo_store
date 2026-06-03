import './RouteLoader.css';

export const RouteLoader = () => (
  <div className="route-loader">
    <div className="route-loader__spinner">
      <div className="route-loader__circle" />
      <div className="route-loader__circle" />
      <div className="route-loader__circle" />
    </div>
    <p className="route-loader__text">Đang tải trang...</p>
  </div>
);
