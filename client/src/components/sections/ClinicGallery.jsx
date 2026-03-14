import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Maximize2 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useClinic } from "../../contexts/ClinicContext";

export default function ClinicGallery() {
  const { colors } = useTheme();
  const { isClinicSpecific, images, videos, clinicName, primaryColor } = useClinic();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Real clinic images placeholder URLs (replace with actual clinic images)
  const clinicImages = images?.length > 0 ? images : [
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=450&fit=crop",
    "https://images.unsplash.com/photo-1582719508461-905c6735e4c4?w=800&h=450&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=450&fit=crop",
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=450&fit=crop"
  ];

  const clinicVideos = videos?.length > 0 ? videos : [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % clinicImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + clinicImages.length) % clinicImages.length);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % clinicVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + clinicVideos.length) % clinicVideos.length);
  };

  if (!isClinicSpecific) {
    return null;
  }

  return (
    <section className="theme-transition" style={{ 
      background: colors.navy, 
      padding: "80px 32px" 
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 36, 
            color: colors.white, 
            marginBottom: 16, 
            fontWeight: 700 
          }}>
            {clinicName} Gallery
          </h2>
          <p style={{ 
            color: colors.slate, 
            fontSize: 16, 
            maxWidth: 600, 
            margin: "0 auto" 
          }}>
            Take a virtual tour of our state-of-the-art facility
          </p>
        </motion.div>

        {/* Images Carousel */}
        {clinicImages?.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <h3 style={{ 
              color: primaryColor, 
              fontSize: 20, 
              marginBottom: 24, 
              fontWeight: 600 
            }}>
              Our Facility
            </h3>
            
            <div style={{ 
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: 20,
              maxWidth: "1200px",
              margin: "0 auto"
            }}>
              {clinicImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    background: colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    position: "relative"
                  }}
                >
                  <img
                    src={image}
                    alt={`${clinicName} facility ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "cover"
                    }}
                  />
                  
                  {/* Image overlay with info */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    padding: "16px",
                    color: colors.white
                  }}>
                    <h4 style={{ 
                      fontSize: 16, 
                      fontWeight: 600, 
                      marginBottom: 4 
                    }}>
                      {clinicName} - Facility {index + 1}
                    </h4>
                    <p style={{ 
                      fontSize: 13, 
                      opacity: 0.9,
                      lineHeight: 1.4
                    }}>
                      {index === 0 && "Modern reception area with comfortable waiting space"}
                      {index === 1 && "Advanced dental treatment rooms with latest equipment"}
                      {index === 2 && "Sterile surgical suite for complex procedures"}
                      {index === 3 && "Professional consultation rooms for patient care"}
                      {index === 4 && "State-of-the-art diagnostic imaging center"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Carousel */}
        {clinicVideos?.length > 0 && (
          <div>
            <h3 style={{ 
              color: primaryColor, 
              fontSize: 20, 
              marginBottom: 24, 
              fontWeight: 600 
            }}>
              Virtual Tour
            </h3>
            
            <div style={{ 
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              gap: 20,
              maxWidth: "1200px",
              margin: "0 auto"
            }}>
              {clinicVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    background: colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    position: "relative"
                  }}
                >
                  <video
                    controls
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "cover"
                    }}
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support video tag.
                  </video>
                  
                  {/* Video overlay with play button */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    padding: "16px",
                    color: colors.white
                  }}>
                    <h4 style={{ 
                      fontSize: 16, 
                      fontWeight: 600, 
                      marginBottom: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}>
                      <Play size={14} />
                      {clinicName} - Virtual Tour {index + 1}
                    </h4>
                    <p style={{ 
                      fontSize: 13, 
                      opacity: 0.9,
                      lineHeight: 1.4
                    }}>
                      {index === 0 && "Complete facility tour with patient areas"}
                      {index === 1 && "Advanced medical equipment showcase"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
