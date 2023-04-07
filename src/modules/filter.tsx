import { fabric } from 'fabric';

const filterLogic = (filOption: string, filStrength: number) => {
  let filter;
  //@ts-expect-error vintage is used in the demos but does not exist in the files
  const vinFilter = new fabric.Image.filters.Vintage();
  const sepFilter = new fabric.Image.filters.Sepia();
  //@ts-expect-error vibrance is used in the demos but does not exist in the files
  const strengthFilter = new fabric.Image.filters.Vibrance({
    vibrance: filStrength / 50,
  });
  const fabFilter = new fabric.Image.filters.Blur({
    blur: filStrength / 100,
  });
  switch (filOption) {
    case 'vintage':
      filter = [vinFilter, strengthFilter];
      break;
    case 'sepia':
      filter = [sepFilter, strengthFilter];
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
