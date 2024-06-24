const HomeSchema = {
  CourseVideoResponseModel: {
    type: 'object',
    properties: {
      status: {
        type: 'boolean',
        example: true
      },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '66759d4758b5f8d2f8ed19e1'
            },
            name: {
              type: 'string',
              example: 'Sample Video2'
            },
            category: {
              type: 'string',
              example: '藝術創作'
            },
            intro: {
              type: 'string',
              example: 'This is a second sample video.'
            },
            url: {
              type: 'string',
              format: 'uri',
              example:
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
            },
            video_type: {
              type: 'string',
              example: 'youtube'
            },
            teacher_id: {
              type: 'string',
              example: '665ae4ba971e705a4aa6a94a'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-06-21T15:33:27.114Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-06-21T15:33:27.114Z'
            }
          }
        }
      }
    }
  },
  CoursesResponseModel: {
    type: 'object',
    properties: {
      status: {
        type: 'boolean',
        example: true
      },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'object',
              properties: {
                $oid: {
                  type: 'string',
                  example: '6677a7cc2d17bab252d857c7'
                }
              }
            },
            name: {
              type: 'string',
              example: '水彩畫的夢幻世界'
            },
            main_image: {
              type: 'string',
              example:
                'https://images.unsplash.com/photo-1601541565026-79d500f55868?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            rate: {
              type: 'number',
              example: 4.7
            },
            content: {
              type: 'string',
              example:
                '<p>在這個課程中，您將學會如何將水彩變成夢幻般的藝術作品。我們將深入探索水彩畫的基本技法，包括濕畫法、乾畫法、漸變和層疊等技術，讓您能夠充分掌握水彩的特性。</p><br/><p>我們會從簡單的幾何圖形開始，逐步進入複雜的風景畫和抽象畫，讓您在實踐中學習如何運用顏料的流動性和透明度，創作出獨特且美麗的作品。此外，我們還會介紹色彩理論，幫助您了解如何選擇和搭配顏色，以增強作品的視覺效果。</p><br/><p>課程中，我們會鼓勵您發揮創意，自由地進行藝術創作，並在每次課後進行反思和分享，讓您能夠在不斷的實踐中提升自己的技巧和風格。不論您是初學者還是已有一定基礎的畫家，都可以在這個課程中找到適合自己的學習步伐。</p><br/><p>我們的課程內容豐富多樣，不僅僅局限於技法的教授，還會探討水彩畫在不同藝術流派中的應用，並分享一些著名水彩畫家的創作故事和經驗。通過這些實例，您將能更好地理解水彩畫的魅力和潛力，並從中獲得靈感。</p><br/><p>此外，我們會安排一些戶外寫生活動，讓您能夠在自然環境中進行創作，體驗不同光線和景物對作品的影響。這些活動不僅能提升您的觀察能力和技巧，還能讓您更好地融入大自然，感受創作的樂趣。</p><br/><p>每次課程結束後，我們都會進行作品展示和評鑑，讓您能夠從其他學員的作品中學習，並聽取老師的專業建議和反饋。這種互動和分享的方式，將有助於您更快地進步，並建立自己的藝術風格。</p><br/><p>最後，我們還會提供一些延伸學習資源和參考書目，幫助您在課後繼續深入學習和練習，鞏固所學的知識和技能。</p><br/><p>在這個課程中，您將不僅僅是學習繪畫技巧，更是一段探索和發現自我藝術潛能的旅程。準備好您的水彩工具和創作靈感，讓我們一起踏上這段充滿創意和驚喜的水彩藝術之旅吧！</p>'
            },
            price_quantity: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: 'price1'
                  },
                  price: {
                    type: 'number',
                    example: 200
                  },
                  quantity: {
                    type: 'integer',
                    example: 1
                  }
                }
              }
            },
            main_category: {
              type: 'string',
              example: '藝術創作'
            },
            sub_category: {
              type: 'string',
              example: '水彩畫'
            },
            city_id: {
              type: 'string',
              example: '1'
            },
            dist_id: {
              type: 'string',
              example: '1'
            },
            survey_url: {
              type: 'string',
              example: 'https://forms.gle/EX6Ps7myHMNG9ff5A'
            },
            status: {
              type: 'integer',
              example: 1
            },
            teacher_id: {
              type: 'object',
              properties: {
                $oid: {
                  type: 'string',
                  example: '6677a80a2d17bab252d857ee'
                }
              }
            },
            purchase_message: {
              type: 'string',
              example: '準備好您的水彩工具和創作靈感，我們一起探索水彩的魅力。'
            },
            video_ids: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            file_ids: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            file_url_ids: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
};

export default HomeSchema;
