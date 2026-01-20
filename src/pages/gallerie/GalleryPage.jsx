import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import CardPicture from "../../components/gallery/CardPicture";
import TitleSection from "../../components/TitleSection";
import Spinner from "../../components/Spinner"
import Modal from "../../components/modals";
import Footer from "../../components/Footer";
import UseFetch from "../../hooks/useFecth";



export default function GalleryPage() {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [imageModal, setImageModal] = useState('');
  const [legende, setLegende] = useState('');
  const photosPerPage = 15;
  const { galeries, getGalerie, loader } = UseFetch();

  useEffect(() => {
    getGalerie()
  }, [])

  console.log(galeries)
  const startIndex = page * photosPerPage;
  const paginatedPhotos = galeries.slice(startIndex, startIndex + photosPerPage);

  const hasPrev = page > 0;
  const hasNext = startIndex + photosPerPage < galeries.length;

  const openModal = (image, legende) => {
    setImageModal(image);
    setLegende(legende);
    setOpen((o) => !o);
  };

  return (
    <div className="w-full">
      <NavBar />
      <div className="flex justify-center mb-4">
        <div className="w-9/12 mt-20">
          <TitleSection
            title={"GALLERIES"}
            sub={"Articles"}
          />
          {loader ? <Spinner
            loader={loader}
          /> : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {paginatedPhotos.map((photo, index) => (
                <CardPicture
                  key={index}
                  image={import.meta.env.VITE_CLOUD_URL_FILE + photo?.file_name}
                  title={`${photo?.legend}`}
                  onClick={() => openModal(import.meta.env.VITE_CLOUD_URL_FILE + photo?.file_name, photo?.legend)}
                />
              ))}
            </div>
          )}

          {/* pagination */}
          <div className="flex justify-between mt-4">
            <button
              className="bg-white border-2 border-[#1769aa] p-2 rounded-lg text-[#1769aa] font-medium cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={!hasPrev}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Précédent
            </button>
            <button className="bg-[#1769aa] py-2 px-5 rounded-lg text-white font-medium disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={!hasNext}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        size="lg"
        headerColor="#1769aa"

      >
        <img src={imageModal} alt={legende} className="md:scale-90 scale-80" />
        <p className="text-gray-600  md:text-lg md:text-base font-meduim text-center">{legende}</p>
      </Modal>
      <Footer />
    </div>
  )
}
