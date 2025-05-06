import Image from "next/image";
import Link from "next/link";

export default function CardDivision({ division }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="h-16 w-16 relative mr-4 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            {division.logoUrl ? (
              <Image
                src={division.logoUrl}
                alt={division.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{division.name}</h3>
            {division.leader ? (
              <p className="text-sm text-gray-600">
                Pemimpin: {division.leader.name}
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic">Belum ada pemimpin</p>
            )}
          </div>
        </div>
        
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Visi:</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{division.vision}</p>
        </div>
        
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Misi:</h4>
          <p className="text-sm text-gray-600 line-clamp-3">{division.mission}</p>
        </div>
        
        <div className="flex justify-end mt-4 gap-2">
          <Link 
            href={`/admin/divisions/edit/${division.id}`}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-4 h-4 mr-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            Edit
          </Link>
          <Link 
            href={`/admin/divisions/detail/${division.id}`}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-4 h-4 mr-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}