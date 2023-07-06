import React from 'react'

export default function Shop() {
  const categories = [
    {
      "id": "0",
      "title": "Hats",
      "items": [
        {
          "price": 25,
          "imageUrl": "https://i.ibb.co/ZYW3VTp/brown-brim.png",
          "name": "Brown Brim",
          "id": 1
        },
        {
          "price": 18,
          "imageUrl": "https://i.ibb.co/ypkgK0X/blue-beanie.png",
          "name": "Blue Beanie",
          "id": 2
        },
        {
          "price": 35,
          "imageUrl": "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
          "name": "Brown Cowboy",
          "id": 3
        },
        {
          "price": 25,
          "imageUrl": "https://i.ibb.co/RjBLWxB/grey-brim.png",
          "name": "Grey Brim",
          "id": 4
        },
        {
          "price": 18,
          "imageUrl": "https://i.ibb.co/YTjW3vF/green-beanie.png",
          "name": "Green Beanie",
          "id": 5
        },
        {
          "price": 14,
          "imageUrl": "https://i.ibb.co/rKBDvJX/palm-tree-cap.png",
          "name": "Palm Tree Cap",
          "id": 6
        },
        {
          "price": 18,
          "imageUrl": "https://i.ibb.co/bLB646Z/red-beanie.png",
          "name": "Red Beanie",
          "id": 7
        },
        {
          "price": 14,
          "imageUrl": "https://i.ibb.co/1f2nWMM/wolf-cap.png",
          "name": "Wolf Cap",
          "id": 8
        },
        {
          "price": 16,
          "imageUrl": "https://i.ibb.co/X2VJP2W/blue-snapback.png",
          "name": "Blue Snapback",
          "id": 9
        }
      ]
    },
    {
      "id": "1",
      "title": "Jackets",
      "items": [
        {
          "price": 125,
          "imageUrl": "https://i.ibb.co/XzcwL5s/black-shearling.png",
          "name": "Black Jean Shearling",
          "id": 18
        },
        {
          "price": 90,
          "imageUrl": "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
          "name": "Blue Jean Jacket",
          "id": 19
        },
        {
          "price": 90,
          "imageUrl": "https://i.ibb.co/N71k1ML/grey-jean-jacket.png",
          "name": "Grey Jean Jacket",
          "id": 20
        },
        {
          "price": 165,
          "imageUrl": "https://i.ibb.co/s96FpdP/brown-shearling.png",
          "name": "Brown Shearling",
          "id": 21
        },
        {
          "price": 185,
          "imageUrl": "https://i.ibb.co/M6hHc3F/brown-trench.png",
          "name": "Tan Trench",
          "id": 22
        }
      ],
    },
    {
      "id": "2",
      "title": "Mens",
      "items": [
        {
          "price": 325,
          "imageUrl": "https://i.ibb.co/xJS0T3Y/camo-vest.png",
          "name": "Camo Down Vest",
          "id": 30
        },
        {
          "price": 20,
          "imageUrl": "https://i.ibb.co/qMQ75QZ/floral-shirt.png",
          "name": "Floral T-shirt",
          "id": 31
        },
        {
          "price": 25,
          "imageUrl": "https://i.ibb.co/55z32tw/long-sleeve.png",
          "name": "Black & White Longsleeve",
          "id": 32
        },
        {
          "price": 25,
          "imageUrl": "https://i.ibb.co/RvwnBL8/pink-shirt.png",
          "name": "Pink T-shirt",
          "id": 33
        },
        {
          "price": 40,
          "imageUrl": "https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png",
          "name": "Jean Long Sleeve",
          "id": 34
        },
        {
          "price": 25,
          "imageUrl": "https://i.ibb.co/mh3VM1f/polka-dot-shirt.png",
          "name": "Burgundy T-shirt",
          "id": 35
        }
      ],
    },
    {
      "id": "3",
      "title": "Sneakers",
      "items": [
        {
          "price": 220,
          "imageUrl": "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
          "name": "Adidas NMD",
          "id": 10
        },
        {
          "price": 280,
          "imageUrl": "https://i.ibb.co/dJbG1cT/yeezy.png",
          "name": "Adidas Yeezy",
          "id": 11
        },
        {
          "price": 110,
          "imageUrl": "https://i.ibb.co/bPmVXyP/black-converse.png",
          "name": "Black Converse",
          "id": 12
        },
        {
          "price": 160,
          "imageUrl": "https://i.ibb.co/1RcFPk0/white-nike-high-tops.png",
          "name": "Nike White AirForce",
          "id": 13
        },
        {
          "price": 160,
          "imageUrl": "https://i.ibb.co/QcvzydB/nikes-red.png",
          "name": "Nike Red High Tops",
          "id": 14
        },
        {
          "price": 160,
          "imageUrl": "https://i.ibb.co/fMTV342/nike-brown.png",
          "name": "Nike Brown High Tops",
          "id": 15
        },
        {
          "price": 190,
          "imageUrl": "https://i.ibb.co/w4k6Ws9/nike-funky.png",
          "name": "Air Jordan Limited",
          "id": 16
        },
        {
          "price": 200,
          "imageUrl": "https://i.ibb.co/Mhh6wBg/timberlands.png",
          "name": "Timberlands",
          "id": 17
        }
      ],
    },
    {
      "id": "4",
      "title": "Womens",
      "items": [
        {
          "price": 25,
          "imageUrl": "https://i.ibb.co/7CQVJNm/blue-tank.png",
          "name": "Blue Tanktop",
          "id": 23
        },
        {
          "price": 20,
          "imageUrl": "https://i.ibb.co/4W2DGKm/floral-blouse.png",
          "name": "Floral Blouse",
          "id": 24
        },
        {
          "price": 80,
          "imageUrl": "https://i.ibb.co/KV18Ysr/floral-skirt.png",
          "name": "Floral Dress",
          "id": 25
        },
        {
          "price": 80,
          "imageUrl": "https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png",
          "name": "Red Dots Dress",
          "id": 26
        },
        {
          "price": 45,
          "imageUrl": "https://i.ibb.co/KmSkMbH/striped-sweater.png",
          "name": "Striped Sweater",
          "id": 27
        },
        {
          "price": 135,
          "imageUrl": "https://i.ibb.co/v1cvwNf/yellow-track-suit.png",
          "name": "Yellow Track Suit",
          "id": 28
        },
        {
          "price": 20,
          "imageUrl": "https://i.ibb.co/qBcrsJg/white-vest.png",
          "name": "White Blouse",
          "id": 29
        }
      ],
    }
  ]

  return (
    <div>shop</div>
  )
}
