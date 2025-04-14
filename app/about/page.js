'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900">
        <Image
          src="/images/about_1.jpg"
          alt="About Us Hero"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Về chúng tôi</h1>
            <p className="text-xl md:text-2xl">Thời trang cho mọi phong cách sống</p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
              <p className="text-gray-600 mb-4">
                Được thành lập vào năm 2020, chúng tôi bắt đầu với một ước mơ đơn giản: 
                mang đến những sản phẩm thời trang chất lượng cao với giá cả phải chăng cho mọi người.
              </p>
              <p className="text-gray-600 mb-4">
                Qua nhiều năm phát triển, chúng tôi đã trở thành một trong những thương hiệu thời trang 
                được yêu thích nhất tại Việt Nam, với hơn 50 cửa hàng trên toàn quốc.
              </p>
              <p className="text-gray-600">
                Chúng tôi tin rằng thời trang không chỉ là về quần áo - đó là về cách bạn cảm nhận 
                và thể hiện bản thân.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/about_1.jpg"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              Giá trị cốt lõi
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hình nên thương hiệu và cam kết của chúng tôi với khách hàng
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Chất lượng',
                description: 'Cam kết mang đến những sản phẩm chất lượng cao nhất cho khách hàng',
                icon: '🌟'
              },
              {
                title: 'Sáng tạo',
                description: 'Không ngừng đổi mới và cập nhật xu hướng thời trang mới nhất',
                icon: '💡'
              },
              {
                title: 'Bền vững',
                description: 'Chú trọng đến môi trường và phát triển bền vững trong mọi hoạt động',
                icon: '🌱'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              Đội ngũ của chúng tôi
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-600 max-w-2xl mx-auto">
              Những con người tài năng và đam mê, cùng nhau xây dựng nên thương hiệu
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                name: 'Dương Mạnh Cường',
                role: 'Giám đốc điều hành',
                image: '/images/about_2.jpg'
              },
              {
                name: 'Trần Thị B',
                role: 'Giám đốc sáng tạo',
                image: '/images/about_3.jpg'
              },
              {
                name: 'Lê Văn C',
                role: 'Quản lý sản phẩm',
                image: '/images/about_2.jpg'
              },
              {
                name: 'Phạm Thị D',
                role: 'Trưởng phòng Marketing',
                image: '/images/about_3.jpg'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center"
              >
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              Liên hệ với chúng tôi
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất có thể
            </motion.p>
            <motion.div variants={fadeIn}>
              <a
                href="mailto:contact@example.com"
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Liên hệ ngay
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 