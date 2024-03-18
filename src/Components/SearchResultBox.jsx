import { useState } from "react";
import ParcelDetailModal from "./ParcelDetailModal";


const SearchResultBox = ({ searchedParcels }) => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ parcelId, setParcelId ] = useState('');


    return (
        <div className="bg-white shadow-2xl rounded-b-md w-full h-52 pt-3 absolute top-9 left-0 right-0 flex flex-col  gap-1 text-left overflow-y-auto">
           
           {searchedParcels?.map(parcel =>  <span   onClick={() => { setIsOpen(true); setParcelId(parcel._id)}}  key={parcel._id} className="bg-gray-50/40 hover:bg-gray-100 text-blue-900 select-none px-3 py-2 rounded-sm cursor-pointer"> {parcel.parcel_type}
           </span>
           )}

           {!searchedParcels?.length && <p className="text-xl text-gray-600 text-center pt-7"> No Parcel Found</p>}

           {isOpen &&  <ParcelDetailModal  setIsOpen={setIsOpen} parcelId={parcelId} />}
         
        </div>
    );
};

export default SearchResultBox;