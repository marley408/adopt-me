import React from 'react';

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  // takes in a set of props and gives back a new set of state
  static getDerivedStateFromProps({ media }) {
    let photos = ['http://placecorgi.com/600/600'];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  // use '+' to parse sting to number, instead of parseInt
  // RULE: when passing functions to children or using a event listener use an arrow funct
  handleIndexClick = e => {
    this.setState({
      active: +e.target.dataset.index
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
