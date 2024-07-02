import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Group {
    name: string;
    event_date?: string;
}

interface ModalUpdateGroupProps {
    onClose: () => void;
    group: Group;
}
export default function ModalUpdateGroup({ onClose, group}:ModalUpdateGroupProps){
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Modifier le groupe</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    &times;
                </button>
            </div>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Nom du groupe</label>
                    <Input
                        type="string"
                        value={group.name}
                        placeholder="nom du groupe"
                        className="mt-1 w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Date de l'évenement</label>
                    <Input
                        type="date"
                        defaultValue={group?.event_date}
                        className="mt-1 w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Valider
                </Button>
            </form>
        </div>
    );
}