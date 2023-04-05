import { fabric } from 'fabric';

const filterLogic = (filOption: string, filStrength: number) => {
  let filter;
  //@ts-expect-error vintage is used in the demos but does not exist in the files
  const vinFilter = new fabric.Image.filters.Vintage();
  const sepFilter = new fabric.Image.filters.Sepia();
  const satFilter = new fabric.Image.filters.Saturation({
    saturation: filStrength / 100,
  });
  const fabFilter = new fabric.Image.filters.Blur({
    blur: filStrength / 100,
  });
  switch (filOption) {
    case 'vintage':
      filter = [vinFilter, satFilter];
      break;
    case 'sepia':
      filter = [sepFilter, satFilter];
      break;
    case 'blur':
      filter = [
        fabFilter,
      ];
      break;
    default:
      break;
  }

  return filter;
};

export default filterLogic;
