export default function SidebarSkeleton() {
  return (
    <div className="sidebar-skeleton">
      {/* Header Skeleton */}
      <div className="skeleton-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-title shimmer"></div>
      </div>

      {/* User list placeholders */}
      {[...Array(7)].map((_, i) => (
        <div key={i} className="skeleton-user">
          <div className="skeleton-avatar shimmer"></div>
          <div className="skeleton-lines">
            <div className="skeleton-line shimmer"></div>
            <div className="skeleton-line short shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
