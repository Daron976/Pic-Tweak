import React, { useState } from 'react';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
import filterLogic from './modules/filter';
import Header from './modules/Header';
import * as htmlToImage from 'html-to-image';

function App() {
  const [image, setImage] = useState('https://images.unsplash.com/photo-1545424273-4dd93a233016?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  const [preview, setPreview] = useState('https://images.unsplash.com/photo-1545424273-4dd93a233016?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  const [range, setRange] = useState(0);
  const [rangeClick, setRangeClick] = useState(false);
  const [loading, setLoading] = useState(false);

  const newImage = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, url: string, fil: string) => {
    e.preventDefault();
    if (rangeClick === false && range === 0) {
      setRangeClick(true);
    } else {
      const newFilter = filterLogic(fil, range);
      //@ts-expect-error fabric is external
      new fabric.Image.fromURL(url, (img) => {
        if(img.filters != undefined) {          
          img.filters.push(
            //@ts-expect-error spread is required for code implementation
            ...newFilter,
          );
        }
        fabric.textureSize = 8172;
        //@ts-expect-error fabric is external
        const imageTextureSize = img.width > img.height ? img.width : img.height;
        //@ts-expect-error fabric is external
        if (imageTextureSize > fabric.textureSize) {
          //@ts-expect-error fabric is external
          fabric.textureSize = imageTextureSize;
        }
        img.applyFilters();
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setPreview(img.toDataURL({quality: 1}));  
        }, 3000);
      }, { crossOrigin: 'anonymous' });

      setRangeClick(false);
    }
  };

  const addImage = (e: { target: { files: File; value: React.SetStateAction<string>; }; }) => {
    if (e.target.files) {
      //@ts-expect-error lenght of files is 1
      const pic = e.target.files[0];
      const newImg = URL.createObjectURL(pic);
      setImage(newImg);
      setPreview(newImg);
    } else {
      setImage(e.target.value);
      setPreview(e.target.value);
    }
  };

  const downloadPngImage = () => {
    saveAs(preview, 'filtered_image');
  };

  const downloadJpegImage = () => {
    //@ts-expect-error required Element is an HTMLELement
    htmlToImage.toJpeg(document.querySelector('.preview-img'), {quality: 1})
    .then((url) => {
      const link = document.createElement('a');
      link.download = 'image.jpeg';
      link.href = url;
      link.click();
    })
  };

  return (
    <section className="App flex">
      <Header />
      <div className="content flex">
        <img
        className='preview-img'
          alt="user files"
          src={loading ? 'https://raw.githubusercontent.com/Daron976/portfolio/main/images/loading.gif' : preview}
        />
        <form
          name="image-form"
          id="image-form"
          method="get"
          className="flex"
        >
          <div
            className='image-upload flex'
          >
            <h2>
              Image Upload
            </h2>
            <input
              type="file"
              id="image-file"
              className="file-custom"
              name="image-file"
              accept="image/*"
              data-buttonText='Upload Image file'
              //@ts-expect-error addImage is linked to fabric which is an external library
              onChange={addImage}
            />
            <small className='separator'>
              <em>Or</em>
            </small>
            <input
              type="url"
              id="image-url"
              name="image-url"
              //@ts-expect-error addImage is linked to fabric which is an external library
              onChange={addImage}
              placeholder="Link to image"
            />
          </div>
          <label htmlFor='filter-range' className='range-label flex'>
            <h2>
              Filter Strength
            </h2>
            <input
              type="range"
              id="filter-range"
              name="filter-range"
              min="0"
              max="100"
              onChange={(e) => {
                if (rangeClick === true) {
                  setRangeClick(false);
                }
                setRange(parseInt(e.target.value));
              }}
            />
          </label>
          <small
            className="errmsg"
            style={{
              display: rangeClick ? 'block' : 'none',
            }}
          >
            Please select a filter strength
          </small>
          <fieldset className='filters flex'>
            <h2>
              Filter Options
            </h2>
            <div className="filter-options flex">
              <input
                type="button"
                value="vintage"
                className="option-btn"
                name="submit-btn"
                onClick={(e) => {
                  newImage(e, image, 'vintage');
                }}
              />
              <input
                type="button"
                value="sepia"
                className="option-btn"
                name="submit-btn"
                onClick={(e) => {
                  newImage(e, image, 'sepia');
                }}
              />
              <input
                type="button"
                value="blur"
                className="option-btn"
                name="submit-btn"
                onClick={(e) => {
                  newImage(e, image, 'blur');
                }}
              />
            </div>
          </fieldset>
        </form>
      </div>
      <div className="download flex">
        <button
          type="button"
          name="download"
          id="download"
          onClick={downloadJpegImage}
        >
          Download as JPEG
        </button>
        <button
          type="button"
          name="download"
          id="download"
          onClick={downloadPngImage}
        >
          Download as PNG
        </button>
      </div>
    </section>
  );
}

export default App;
