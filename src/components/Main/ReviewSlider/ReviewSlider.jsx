import React, { useState, useEffect, Suspense } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  Reviews,
  Title,
  Thumb,
  ReviewText,
  PeopleName,
  Rating,
  Wrapper,
  PepleImg,
  RatingStarIcon,
  ArrowContainer,
  StyledLeftArrow,
  TestimonialCard,
  StyledButton,
  StyledRightArrow,
} from './ReviewSlider.styled';
import { getReviews } from '../../../redux/review/getReviews';
import { Container } from 'components';

export const ReviewSlider = () => {
  const [reviewCards, setReviewCards] = useState([]);
  const maxStars = 5;

  useEffect(() => {
    async function fetchReviews() {
      const reviews = await getReviews();
      setReviewCards(reviews);
    }
    fetchReviews();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Reviews>
        <Container main_page>
          <Title>reviews</Title>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              1440: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {reviewCards.map(item => {
              const { _id, stars, owner, reviewText } = item;
              return (
                <SwiperSlide
                  key={_id}
                  style={{
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <TestimonialCard>
                    <Thumb>
                      <PepleImg src={owner?.avatarUrl} alt="photo of owner" />
                      <Wrapper>
                        <PeopleName>{owner?.name}</PeopleName>
                        <Rating>
                          {[...Array(maxStars)].map((_, index) => (
                            <RatingStarIcon
                              key={index}
                              fill={index < stars ? '#ffac33' : '#CEC9C1'}
                            />
                          ))}
                        </Rating>
                      </Wrapper>
                    </Thumb>
                    <ReviewText>{reviewText}</ReviewText>
                  </TestimonialCard>
                </SwiperSlide>
              );
            })}
            <ArrowContainer>
              <StyledButton className="swiper-button-prev">
                <StyledLeftArrow />
              </StyledButton>
              <StyledButton className="swiper-button-next">
                <StyledRightArrow />
              </StyledButton>
            </ArrowContainer>
          </Swiper>
        </Container>
      </Reviews>
    </Suspense>
  );
};
