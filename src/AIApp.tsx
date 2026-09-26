import { useState } from 'react';
import { animals } from './data/animals';
import './style/AIApp.css';

export default function AIApp({ onBack }: { onBack: () => void }) {
    // Dataset Toggle State (Starts with 10 animals)
    const [includeEdgeCases, setIncludeEdgeCases] = useState(false);
    
    // The active dataset
    const currentAnimals = includeEdgeCases ? animals : animals.slice(0, 10);

    const [rules, setRules] = useState([
        { trait: 'hasFur', isTrue: true, predictedClass: 'Mammal' }
    ]);
    const [fallbackClass, setFallbackClass] = useState('Fish');

    const traits = [
        { id: 'hasFur', label: 'Fur' },
        { id: 'canFly', label: 'Wings (Can Fly)' },
        { id: 'laysEggs', label: 'Eggs (Lays Eggs)' },
        { id: 'hasFins', label: 'Fins' },
        { id: 'isPredator', label: 'Predator Instincts' },
        { id: 'warmBlooded', label: 'Warm Blood' }
    ];
    const classes = ['Mammal', 'Bird', 'Reptile', 'Fish', 'Amphibian', 'Insect', 'Arachnid'];

    const addRule = () => setRules([...rules, { trait: 'canFly', isTrue: true, predictedClass: 'Bird' }]);
    const removeRule = (index: number) => setRules(rules.filter((_, i) => i !== index));
    const updateRule = (index: number, key: string, value: any) => {
        const newRules = [...rules];
        newRules[index] = { ...newRules[index], [key]: value };
        setRules(newRules);
    };

    const loadModelAnswer = () => {
        if (!includeEdgeCases) {
            // 100% Accuracy Model for the 10 Beginner Animals
            setRules([
                { trait: 'laysEggs', isTrue: false, predictedClass: 'Mammal' },
                { trait: 'hasFur', isTrue: true, predictedClass: 'Mammal' },
                { trait: 'hasFins', isTrue: true, predictedClass: 'Fish' },
                { trait: 'warmBlooded', isTrue: true, predictedClass: 'Bird' },
                { trait: 'canFly', isTrue: true, predictedClass: 'Insect' }
            ]);
            setFallbackClass('Reptile');
        } else {
            // 85% Feature Starvation Model for the 20 Edge-Case Animals
            setRules([
                { trait: 'hasFur', isTrue: true, predictedClass: 'Mammal' },
                { trait: 'laysEggs', isTrue: false, predictedClass: 'Mammal' },
                { trait: 'hasFins', isTrue: true, predictedClass: 'Fish' },
                { trait: 'warmBlooded', isTrue: true, predictedClass: 'Bird' },
                { trait: 'canFly', isTrue: true, predictedClass: 'Insect' }
            ]);
            setFallbackClass('Reptile');
        }
    };

    // 2. The Engine: Drops each animal down the tree based on the active dataset
    const leaves = rules.map(rule => ({ ...rule, animals: [] as any[] }));
    const fallbackLeaf = { predictedClass: fallbackClass, animals: [] as any[] };

    currentAnimals.forEach(animal => {
        let matched = false;
        for (let i = 0; i < rules.length; i++) {
            if ((animal as any)[rules[i].trait] === rules[i].isTrue) {
                leaves[i].animals.push(animal);
                matched = true;
                break; 
            }
        }
        if (!matched) {
            fallbackLeaf.animals.push(animal);
        }
    });

    const calculatePurity = (leafAnimals: any[], targetClass: string) => {
        if (leafAnimals.length === 0) return 0;
        const correct = leafAnimals.filter(a => a.animalClass === targetClass).length;
        return Math.round((correct / leafAnimals.length) * 100);
    };

    // Calculate Total Model Accuracy against the active dataset
    let totalCorrect = 0;
    leaves.forEach(leaf => {
        totalCorrect += leaf.animals.filter(a => a.animalClass === leaf.predictedClass).length;
    });
    totalCorrect += fallbackLeaf.animals.filter(a => a.animalClass === fallbackLeaf.predictedClass).length;
    const overallAccuracy = Math.round((totalCorrect / currentAnimals.length) * 100);

    return (
        <div className="ai-app-container">
            <button onClick={onBack} className="back-button">
                &larr; Back to Hub
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Full Classification Tree</h2>
                    <p style={{ marginTop: 0 }}>Sort the ENTIRE dataset by building sequential branches.</p>
                </div>
                
                {/* Dataset Toggle Control */}
                <div style={{ display: 'flex', gap: '5px', backgroundColor: '#1e293b', padding: '5px', borderRadius: '6px', border: '1px solid #334155' }}>
                    <button 
                        onClick={() => setIncludeEdgeCases(false)} 
                        style={{ padding: '8px 12px', backgroundColor: !includeEdgeCases ? '#3b82f6' : 'transparent', color: !includeEdgeCases ? 'white' : '#94a3b8', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        10 Animals
                    </button>
                    <button 
                        onClick={() => setIncludeEdgeCases(true)} 
                        style={{ padding: '8px 12px', backgroundColor: includeEdgeCases ? '#a855f7' : 'transparent', color: includeEdgeCases ? 'white' : '#94a3b8', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        20 Edge Cases
                    </button>
                </div>
            </div>

            {/* Tree Builder UI */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3 style={{ marginTop: 0 }}>Build your branches:</h3>
                
                {rules.map((rule, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 'bold', width: '70px', color: '#38bdf8' }}>
                            {index === 0 ? 'IF' : 'ELSE IF'}
                        </span>
                        
                        <select 
                            value={rule.trait} 
                            onChange={(e) => updateRule(index, 'trait', e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px' }}
                        >
                            {traits.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </select>

                        <label> = </label>
                        <select 
                            value={rule.isTrue ? 'true' : 'false'} 
                            onChange={(e) => updateRule(index, 'isTrue', e.target.value === 'true')}
                            style={{ padding: '8px', borderRadius: '4px' }}
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>

                        <span style={{ fontWeight: 'bold', margin: '0 10px' }}>THEN IT IS A:</span>
                        <select 
                            value={rule.predictedClass} 
                            onChange={(e) => updateRule(index, 'predictedClass', e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px' }}
                        >
                            {classes.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        {rules.length > 1 && (
                            <button onClick={() => removeRule(index)} style={{ padding: '8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                X
                            </button>
                        )}
                    </div>
                ))}

                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <button onClick={addRule} style={{ padding: '8px 16px', backgroundColor: '#334155', color: 'white', border: '1px dashed #94a3b8', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add New Branch
                    </button>
                    <button onClick={loadModelAnswer} style={{ padding: '8px 16px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Load Model Answer
                    </button>
                </div>

                {/* The Fallback Leaf */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', borderTop: '1px solid #334155', paddingTop: '15px' }}>
                    <span style={{ fontWeight: 'bold', width: '70px', color: '#fb923c' }}>ELSE</span>
                    <span style={{ fontWeight: 'bold' }}>EVERYTHING LEFT OVER IS A:</span>
                    <select 
                        value={fallbackClass} 
                        onChange={(e) => setFallbackClass(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px' }}
                    >
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            {/* Overall Tree Performance */}
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#0f172a', borderRadius: '8px', border: `1px solid ${overallAccuracy === 100 ? '#22c55e' : (overallAccuracy >= 85 ? '#eab308' : '#334155')}` }}>
                <h3 style={{ margin: 0, color: overallAccuracy === 100 ? '#22c55e' : (overallAccuracy >= 85 ? '#eab308' : 'white') }}>
                    Overall Tree Accuracy: {overallAccuracy}%
                </h3>
            </div>

            {/* Results Dashboard (All Leaves) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {leaves.map((leaf, index) => {
                    const purity = calculatePurity(leaf.animals, leaf.predictedClass);
                    return (
                        <div key={index} style={{ padding: '15px', backgroundColor: '#1e293b', borderRadius: '8px', borderLeft: `5px solid ${purity === 100 ? '#22c55e' : '#ef4444'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <h4 style={{ margin: 0 }}>Branch {index + 1}: Classify as {leaf.predictedClass}</h4>
                                <span style={{ color: purity === 100 ? '#22c55e' : '#ef4444', fontWeight: 'bold' }}>Purity: {purity}%</span>
                            </div>
                            
                            <div className="animal-grid">
                                {leaf.animals.map(animal => (
                                    <div key={animal.id} className="animal-card" style={{ border: animal.animalClass === leaf.predictedClass ? '1px solid #22c55e' : '1px solid #ef4444' }}>
                                        <img src={animal.imageUrl} alt={animal.name} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
                                        <div>{animal.name}</div>
                                        {animal.animalClass !== leaf.predictedClass && (
                                            <div style={{ fontSize: '0.7em', color: '#ef4444' }}>{animal.animalClass}</div>
                                        )}
                                    </div>
                                ))}
                                {leaf.animals.length === 0 && <span style={{ color: '#94a3b8' }}>No animals fell into this bucket.</span>}
                            </div>
                        </div>
                    );
                })}

                {(() => {
                    const fallbackPurity = calculatePurity(fallbackLeaf.animals, fallbackLeaf.predictedClass);
                    return (
                        <div style={{ padding: '15px', backgroundColor: '#0f172a', borderRadius: '8px', borderLeft: `5px solid ${fallbackPurity === 100 ? '#22c55e' : '#ef4444'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <h4 style={{ margin: 0 }}>Fallback Bucket: Classify as {fallbackLeaf.predictedClass}</h4>
                                <span style={{ color: fallbackPurity === 100 ? '#22c55e' : '#ef4444', fontWeight: 'bold' }}>Purity: {fallbackPurity}%</span>
                            </div>
                            
                            <div className="animal-grid">
                                {fallbackLeaf.animals.map(animal => (
                                    <div key={animal.id} className="animal-card" style={{ border: animal.animalClass === fallbackLeaf.predictedClass ? '1px solid #22c55e' : '1px solid #ef4444' }}>
                                        <img src={animal.imageUrl} alt={animal.name} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
                                        <div>{animal.name}</div>
                                        {animal.animalClass !== fallbackLeaf.predictedClass && (
                                            <div style={{ fontSize: '0.7em', color: '#ef4444' }}>{animal.animalClass}</div>
                                        )}
                                    </div>
                                ))}
                                {fallbackLeaf.animals.length === 0 && <span style={{ color: '#94a3b8' }}>Empty (All animals classified by rules above).</span>}
                            </div>
                        </div>
                    );
                })()}

            </div>
        </div>
    );
}