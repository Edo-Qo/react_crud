export default function NotFoundComponent() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
      <div className="text-gray-400 mb-4">
        <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No todos found</h3>
      <p className="text-gray-500">Try adjusting your search criteria or create a new todo.</p>
    </div>
  );
}
