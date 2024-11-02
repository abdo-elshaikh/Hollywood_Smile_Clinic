import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Container } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../services/axiosInstance";


// Sample FAQ data
const demoFaqData = [
  {
    question_en: "What is a Hollywood Smile?",
    question_ar: "ما هي ابتسامة هوليوود؟",
    answer_en: "A Hollywood Smile is a cosmetic dental procedure designed to create a bright, attractive smile through treatments like veneers, teeth whitening, and orthodontics.",
    answer_ar: "ابتسامة هوليوود هي إجراء تجميلي للأسنان مصمم لإنشاء ابتسامة مشرقة وجذابة من خلال علاجات مثل القشور الخزفية، وتبييض الأسنان، وتقويم الأسنان.",
    showInHome: true,
    tags: ["cosmetic", "smile makeover"],
    order: 1
  },
  {
    question_en: "Who is a suitable candidate for a Hollywood Smile?",
    question_ar: "من هو المرشح المناسب لابتسامة هوليوود؟",
    answer_en: "Ideal candidates are individuals with stained, chipped, or misaligned teeth. A consultation with our cosmetic dentist will help determine the best treatment plan for your needs.",
    answer_ar: "المرشحون المثاليون هم الأشخاص الذين يعانون من تصبغ أو تشقق أو اعوجاج الأسنان. ستساعدك الاستشارة مع طبيب الأسنان التجميلي لدينا في تحديد خطة العلاج الأنسب لاحتياجاتك.",
    showInHome: true,
    tags: ["candidates", "cosmetic dentistry"],
    order: 2
  },
  {
    question_en: "How long does it take to get a Hollywood Smile?",
    question_ar: "كم من الوقت يستغرق الحصول على ابتسامة هوليوود؟",
    answer_en: "The duration varies based on the treatments required. Some patients achieve results in a few visits, while others may need several months.",
    answer_ar: "يختلف الوقت حسب العلاجات المطلوبة. يحقق بعض المرضى النتائج في بضع زيارات، بينما قد يحتاج البعض الآخر إلى عدة أشهر.",
    showInHome: true,
    tags: ["time frame", "treatment duration"],
    order: 3
  },
  {
    question_en: "What treatments are involved in a Hollywood Smile?",
    question_ar: "ما هي العلاجات التي تتضمنها ابتسامة هوليوود؟",
    answer_en: "Common treatments include teeth whitening, veneers, orthodontics to align teeth, and additional procedures like gum contouring to enhance aesthetics.",
    answer_ar: "تشمل العلاجات الشائعة تبييض الأسنان، والقشور الخزفية، وتقويم الأسنان لتعديل الأسنان، وإجراءات إضافية مثل تحديد اللثة لتحسين الجماليات.",
    showInHome: false,
    tags: ["treatments", "procedures"],
    order: 4
  },
  {
    question_en: "How much does a Hollywood Smile cost?",
    question_ar: "كم تكلفة ابتسامة هوليوود؟",
    answer_en: "The cost depends on the treatments involved. We offer customized plans to suit your goals and will provide a detailed cost breakdown during your consultation.",
    answer_ar: "تعتمد التكلفة على العلاجات المشمولة. نقدم خططًا مخصصة لتناسب أهدافك وسنقدم لك تفاصيل عن التكلفة خلال استشارتك.",
    showInHome: false,
    tags: ["cost", "pricing"],
    order: 5
  }
];

const FAQSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axiosInstance.get('/faqs');
        if (response.status === 200) {
          const data = response.data;
          setFaqData(data.filter(faq => faq.showInHome));
        } else {
          console.error('Failed to fetch FAQs');
        }
      } catch (error) {
        console.error('Failed to fetch FAQs', error);
      }
    }
    fetchFAQs();
  }, []);

  // Sort FAQs in ascending order based on the 'order' property
  const sortedFAQs = faqData.sort((a, b) => a.order - b.order);

  return (
    <Box component={Container} sx={{ py: 8, maxWidth: "lg", minHeight: "600px" }}>
      <Grid container spacing={2}>
        {/* Left side: Introduction */}
        <Grid item xs={12} md={6} >
          <Typography variant="h2" align={isRTL ? "right" : "left"} sx={{ color: "#184e77", marginBottom: 4 }}>
            {t("FAQSection.title")} <span style={{ color: "#f07167" }}>{t("FAQSection.subtitle")}</span>
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#6d6875", marginBottom: 4 }}>
            {t("FAQSection.description")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/faq"
            sx={{
              backgroundColor: "#184e77",
              "&:hover": { backgroundColor: "#f07167" },
              marginBottom: 4,
            }}
          >
            {t("FAQSection.learnMore")}
          </Button>
        </Grid>

        {/* Right side: FAQ section */}
        <Grid item xs={12} md={6}>
          <FAQContent faqData={faqData} isRTL={isRTL} />
        </Grid>
      </Grid>
    </Box>
  );
};

const FAQContent = ({ faqData = [], isRTL }) => {

  return (
    <>
      {faqData.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Accordion
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
              boxShadow: 1,
              marginBottom: 2,
              "&:before": { display: "none" },
              "&.Mui-expanded": {
                backgroundColor: "#f07167",
                color: "#fff",
                "& .MuiAccordionSummary-root": { backgroundColor: "#f07167" },
                "& .MuiTypography-root": { color: "#fff" },
              },
              "&:hover": { boxShadow: 3 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: "#184e77" }} />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                backgroundColor: "#edf6f9",
                borderRadius: 1,
                "&.Mui-expanded": { backgroundColor: "#f07167" },
                "&:hover": { backgroundColor: "#ffddd2" },
              }}
            >
              <Typography sx={{ color: "#184e77", fontWeight: 600 }}>{isRTL ? faq.question_ar : faq.question_en}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "#6d6875" }}>{isRTL ? faq.answer_ar : faq.answer_en}</Typography>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ))}
    </>
  );
};

export default FAQSection;
