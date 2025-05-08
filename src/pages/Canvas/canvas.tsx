import _ from 'lodash'
import 'tldraw/tldraw.css'
import { MoveDiagonal2 } from 'lucide-react'
import { Editor, TLEventMapHandler, Tldraw } from 'tldraw'
import { useCallback, useEffect, useState } from 'react'

export default function Canvas() {
	const 	[editor, setEditor] = useState<Editor>(),
			[storeEvents, setStoreEvents] = useState<string[]>([]),
			[logOpen, setLogOpen] = useState<boolean>(false);

	const setAppToState = useCallback((editor: Editor) => {
		setEditor(editor);

		if (location.pathname.includes('past')) {
			const saved = localStorage.getItem('tldraw-project');
			if (saved) {
				try {
					const parsed = JSON.parse(saved);
					editor.store.loadStoreSnapshot(parsed);
				} catch (e) {
					console.error('Failed to load snapshot', e);
				}
			}
		}
	}, [location.pathname]);

	useEffect(() => {
		if (!editor) return

		const saveToLocalStorage = () => {
			const snapshot = editor.store.getStoreSnapshot();
			localStorage.setItem('tldraw-project', JSON.stringify(snapshot));
		};

		function logChangeEvent(eventName: string) {
			setStoreEvents((events) => [...events, eventName])
		}

		const handleChangeEvent: TLEventMapHandler<'change'> = (change) => {
			saveToLocalStorage();
			// Added
			for (const record of Object.values(change.changes.added)) {
				if (record.typeName === 'shape') {
					logChangeEvent(`created shape (${record.type})\n`)
				}
			}

			// Updated
			for (const [from, to] of Object.values(change.changes.updated)) {
				if (
					from.typeName === 'instance' &&
					to.typeName === 'instance' &&
					from.currentPageId !== to.currentPageId
				) {
					logChangeEvent(`changed page (${from.currentPageId}, ${to.currentPageId})`)
				} else if (from.id.startsWith('shape') && to.id.startsWith('shape')) {
					let diff = _.reduce(
						from,
						(result: any[], value, key: string) =>
							_.isEqual(value, (to as any)[key]) ? result : result.concat([key, (to as any)[key]]),
						[]
					)
					if (diff?.[0] === 'props') {
						diff = _.reduce(
							(from as any).props,
							(result: any[], value, key) =>
								_.isEqual(value, (to as any).props[key])
									? result
									: result.concat([key, (to as any).props[key]]),
							[]
						)
					}
					logChangeEvent(`updated shape (${JSON.stringify(diff)})\n`)
				}
			}

			// Removed
			for (const record of Object.values(change.changes.removed)) {
				if (record.typeName === 'shape') {
					logChangeEvent(`deleted shape (${record.type})\n`)
				}
			}
		}

		const cleanupFunction = editor.store.listen(handleChangeEvent, { source: 'user', scope: 'all' })

		return () => {
			cleanupFunction()
		}
	}, [editor])

	return (
		<div className='flex w-full rounded-3xl overflow-hidden border border-gray-100' style={{height: 'calc(100vh - 2rem)'}}>
			<div className='w-full h-full'>
				<Tldraw onMount={setAppToState} options={{ maxPages: 1 }} />
			</div>
			<div
				style={{zIndex: 9999}}
				className={`absolute bg-gray-100 oveflow-hidden overflow-y-auto border border-gray-200 rounded-2xl flex items-center justify-center ${logOpen ? 'w-screen h-screen bottom-0 right-0' : 'w-fit h-fit bottom-10 right-10'}`}
				onCopy={(event) => event.stopPropagation()}
			>
				<button className={`w-10 h-10 p-2 ${logOpen ? 'absolute top-2 left-2' : ''}`} onClick={() => setLogOpen(!logOpen)}>
					<MoveDiagonal2 className="w-6 h-6 text-gray-700"/>
				</button>
				{logOpen && (
					<pre className='w-full h-full'>{storeEvents}</pre>
				)}
			</div>
		</div>
	)
}