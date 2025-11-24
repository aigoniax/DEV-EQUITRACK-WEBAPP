import { UtensilsCrossed } from "lucide-react";

const TransactionInfoCard = ({icon, title, date, amount, type, hideDeleteBtn, onDelete}) => {
    const getAmountStyles = () => type === 'income'? 'bg-green-50 text-green-800': 'bg-red-50 text-red-800';
    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {icon ? (
                    <img src={icon} alt={title} className="w-6 h-6" />
                ): (
                    <UtensilsCrossed className="text-purple-500"/>
                )}
            </div>       
        </div>
    )
}

export default TransactionInfoCard;