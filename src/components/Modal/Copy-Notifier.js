import { motion, AnimatePresence } from "framer-motion";

const CopyNotifier = (props) => {
    setTimeout(() => {props.disable()}, 6000);
  return (
    <AnimatePresence
    onExitComplete={() => null}
  >
{props.status && <motion.div
      key={props.status}
      className="copy-notifier text-full"
      initial={{ opacity: 0, y: 50, x: 50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 50, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="heading-tertiary" style={{transform: "translateY(-0.5rem)"}}>Hexcode Copied</h3>
    </motion.div>}
    </AnimatePresence>
  );
};

export default CopyNotifier
