import { motion } from "framer-motion";
import { Briefcase } from "lucide-react"; 

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex space-x-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3, 
            }}
          >
            <Briefcase className=" w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-20 xl:h-20 text-blue-500" /> 
          </motion.div>
        ))}
      </div>
      <p className="mt-6 m-2 text-sm md:text-xl lg:text-xl xl:text-xl font-bold text-gray-700 text-center">
        Informing you about your next possible career opportunities ....
      </p>
    </div>
  );
};

export default Loader;
